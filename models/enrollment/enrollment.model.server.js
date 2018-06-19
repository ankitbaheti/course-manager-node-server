var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

function deleteEnrollments(sectionId){
  return enrollmentModel.remove({section: sectionId})
}

function deleteEnrollmentById(id){
  return enrollmentModel.remove(id)
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
    deleteEnrollments: deleteEnrollments,
    deleteEnrollmentById: deleteEnrollmentById
};